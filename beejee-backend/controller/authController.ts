import {CustomPreHandler, CustomRouteHandler} from "../types/controller";
import {LoginBody, LoginResponse} from "../types/auth-schema";
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../config";
import CustomError from "../utils/CustomError";

export const validateToken: CustomPreHandler = async (req, res) => {
    const bearer = req.headers.authorization;
    try {
        jwt.verify(bearer?.split(" ")[1] || '', JWT_SECRET);
    } catch(error) {
        res.code(401);
        throw new CustomError({token: 'Not valid'});
    }
}

export const login: CustomRouteHandler<{Body: LoginBody, Reply: LoginResponse}> = async (req, res) => {
    const {username, password} = req.body;
    if(username === 'admin' && password === '123') {
        const token = jwt.sign({username}, JWT_SECRET, {expiresIn: '24h'});
        return {token};
    }
    res.code(401);
    throw new CustomError('Invalid username or password');
}