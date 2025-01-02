import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import admin from "../utils/firebase";
import { UserRegisterBM } from "../models/UserRegisterBM";
import { Result } from "../utils/Result";
import { UserCreatedResponseDTO } from "../models/UserCreatedResponseDTO";

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    public async getAllUsers(): Promise<Result<User[]>> {
        const users = await this.userRepository.find();
        return Result.new<User[]>(users);
    }

    public async createUserFromEmail(userBM: UserRegisterBM): Promise<Result<UserCreatedResponseDTO>> {
        if (await this.checkIfEmailExists(userBM.email)) return Result.newError(409, "This email address is already being used.");
        if (await this.checkIfUsernameExists(userBM.username)) return Result.newError(409, "This username already exists.");
        return await admin.auth().createUser({
            email: userBM.email,
            password: userBM.password,
            displayName: userBM.username,
        }).then(async userRecord => {
            const user = new User();
            user.email = userBM.email;
            user.username = userBM.username;
            user.firebaseId = userRecord.uid;
            const newUser = await this.createAppUser(user);

            const customToken = await admin.auth().createCustomToken(userRecord.uid);

            const responseDto = new UserCreatedResponseDTO();
            responseDto.appUserId = newUser.data?.id as number;
            responseDto.customToken = customToken;

            return Result.new(responseDto);
        }).catch(error => {
            return Result.newError<UserCreatedResponseDTO>(500, "User creation failed");
        });
    }

    public async createUserFromProvider(userBM: UserRegisterBM, firebaseId: string): Promise<Result<User>> {
        if (await this.checkIfEmailExists(userBM.email)) {
            admin.auth().deleteUser(firebaseId).catch(error => console.error("Error deleting user:", error.message));
            return Result.newError(409, "This email address is already being used.");
        }
        if (await this.checkIfUsernameExists(userBM.username)) {
            admin.auth().deleteUser(firebaseId);
            return Result.newError(409, "This username already exists.")
        };
        const user = new User();
        user.email = userBM.email;
        user.username = userBM.username;
        user.firebaseId = firebaseId;
        return await this.createAppUser(user);
    }

    public async createUserFromProviderLogin(userBM: UserRegisterBM, firebaseId: string): Promise<Result<boolean>> {
        if (await this.checkIfFirebaseUserExistsInApp(firebaseId)) {
            return Result.new(false);
        }
        if (await this.checkIfEmailExists(userBM.email)) {
            admin.auth().deleteUser(firebaseId).catch(error => console.error("Error deleting user:", error.message));
            return Result.newError(409, "This email address is already being used on another account.");
        }
        if (await this.checkIfUsernameExists(userBM.username)) {
            admin.auth().deleteUser(firebaseId);
            return Result.newError(409, "This username already exists.")
        };
        const user = new User();
        user.email = userBM.email;
        user.username = userBM.username;
        user.firebaseId = firebaseId;
        await this.createAppUser(user);
        return Result.new(true);
    }

    public async removeUser(uid: string): Promise<Result<boolean>> {
        if (!uid) return Result.newError(400, "Request not valid");
        try {
            await admin.auth().deleteUser(uid);
            await this.userRepository
                .createQueryBuilder()
                .delete()
                .where("firebaseId = :firebaseId", { firebaseId: uid })
                .execute();
            return Result.new(true);
        } catch (err) {
            throw err;
        }
    }

    private async createAppUser(user: User): Promise<Result<User>> {
        return await this.userRepository.save(user)
            .then(newUser => {
                return Result.new<User>(newUser);
            })
            .catch(error => {
                admin.auth().deleteUser(user.email);
                return Result.newError<User>(500, "App user creation failed");
            });
    }

    private async checkIfEmailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email: email } });
        return user ? true : false;
    }

    private async checkIfUsernameExists(username: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        return user ? true : false;
    }

    private async checkIfFirebaseUserExistsInApp(firebaseId: string) {
        const user = await this.userRepository.findOne({ where: { firebaseId: firebaseId } });
        console.log("checkIfFirebaseUserExistsInApp", user);
        return user ? true : false;
    }
}