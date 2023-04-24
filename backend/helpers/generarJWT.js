import jwt from 'jsonwebtoken';

const generarJWT = (id) => { // ID de vet

    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });

};



export default generarJWT;