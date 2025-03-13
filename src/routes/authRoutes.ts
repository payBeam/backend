import express from 'express';
import { createUser, getUsers } from '@/controllers/userController';

const router = express.Router();


router.post('/google-signup', (req, res) => {
    res.status(200).send("post route works")
});

router.get('/google-login', getUsers);

router.get("/google-redirect", (req, res) => {
    console.log(req)
    res.status(200).send("google redirect works well")

})

export default router;
