import express from 'express';
import { JsonRpcProvider, ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ status: '✅ Blockchain Transfer Bot is running' });
});

app.get('/balance/:address?', async (req, res) => {
    try {
        const apiKey = process.env.ALCHEMY_API_KEY;
        if (!apiKey) {
            return res.status(400).json({ error: 'ALCHEMY_API_KEY missing' });
        }

        const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${apiKey}`);
        const address = req.params.address || '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
        const balance = await provider.getBalance(address);
        res.json({
            address,
            balance: ethers.formatEther(balance)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
