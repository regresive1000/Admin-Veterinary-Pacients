import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

// antes de guardar los datos en el DB, Hashea el password
veterinarioSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { // Si el password no fue modificado (Porque pueden haber otros saves donde no se toque el password)
                                        // Entonces pasa al siguiente middleware de una
        next();
    }                   
    const salt = await bcrypt.genSalt(10); // Si el password es modificado, lo hashea nuevamente
    this.password = await bcrypt.hash(this.password, salt);

});

// Comprueba el password deshasheando
veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;

