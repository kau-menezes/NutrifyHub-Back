import AppError from "../AppError.js";

export async function handleError(error, req, res, next) {

    if(error instanceof AppError) {
        return res.status(error.statuscode).json({
            message: error.message
        })
    }

    console.error(error)
    return res.status(500).json({
        message: "Server Internal Error nem a gente sabe oq rolou"
    })
}