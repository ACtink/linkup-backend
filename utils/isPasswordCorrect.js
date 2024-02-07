import bcrypt from "bcrypt"

export const isPasswordCorrect = async (password, hashedPassword)=>{

    console.log(password, hashedPassword)
    const match = await bcrypt.compare(password, hashedPassword);


  return match

    

}