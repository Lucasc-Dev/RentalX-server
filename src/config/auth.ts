export default {
    jwt: {
        secret: process.env.TOKEN || 'default',
        expiresIn: '10d'
    }
}