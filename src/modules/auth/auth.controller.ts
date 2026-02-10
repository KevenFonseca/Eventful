import {Request, Response} from "express"
import { UserModel } from "../users/user.model.js"
import { generateToken } from "../../utils/jwt.js"
import { validateDTO } from "../../middlewares/validateDTO.js"

export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, role } =  req.body

        const exist = await UserModel.findOne({ email })
        if (exist) return res.status(409).json({ error: 'Email already registered' })

        const user = await UserModel.create({ 
            name, 
            email, 
            password, 
            role: role || 'participant'
        })

        return res.status(201).json(user)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error'})
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body
            
        const user = await UserModel.findOne({ email })

        if (!user) return res.status(401).json({ error: 'User not found' })

        const passwordIsValid = await user.isPasswordValid(password)
        if (!passwordIsValid) return res.status(401).json({ error: 'Invalid email or password' })

        const token = generateToken({ id: user._id.toString(), role: user.role })

        return res.status(200).json({ 
            token, 
            user: {id: user._id, name: user.name, role: user.role }
        })
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}