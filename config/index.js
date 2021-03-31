export default {
    port: 8080,
    mongo: {
        host: 'mongodb://localhost:27017',
        db: 'movies'
    },
    session: {
        secret: 'express_project',
        expirationTime: 60 * 60 * 1000
    },
    classification: [
        'Animation',
        'Adventure',
        'Comedy',
        'Family',
        'Crime'
    ]
}