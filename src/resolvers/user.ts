import argon from "argon2";
import { User } from "../entities/User";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { MyContext } from "types";

@InputType()
class UserFieldsInput {
    @Field()
    username: string 

    @Field()
    password: string

}

@ObjectType()
class FieldError{
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class UserResponse{
    @Field(()=> User , {nullable: true})
    user?: User 

    @Field(()=>[FieldError] , {nullable: true})
    errors?: FieldError[]
}

@Resolver()
export class UserResolver {

    @Mutation(() => User)
    async register(
        @Arg("options" , ()=> UserFieldsInput) options: UserFieldsInput ,
        @Ctx(){em } : MyContext
    ){
        const hashedPasswd = await argon.hash(options.password);
        const user = em.create(User , {
            username : options.username ,
            password : hashedPasswd 
        } as User)

        await em.persistAndFlush(user)
        return user
    }

    @Query(() => UserResponse )
    async login(
        @Arg("options" , ()=> UserFieldsInput) options: UserFieldsInput ,
        @Ctx(){em} : MyContext
    ) : Promise<UserResponse> {
        const user = await em.findOne(User , {username : options.username})
        if(!user){
            return {
                errors:[{
                    field: "username and password" ,
                    message: "invalid credentials"
                }]
            }
        }
        
        const valid = await argon.verify(user.password , options.password)
        console.info(valid , "------")
        if(!valid){
            return {
                errors:[{
                    field: "username and password" ,
                    message: "invalid credentials"
                }]
            }
        }
        return {
            user: user
        }
    }
}