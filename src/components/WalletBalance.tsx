import { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Card } from './ui/card';
import { useQuery } from '@tanstack/react-query';

const WALLET_ADDRESS = '4e3kjUPi55QUakwrr5SRhuBsUb8tcp2jZSkS6szqFSk6';
// Using a more reliable public RPC endpoint
const SOLANA_RPC_URL = 'https://api.devnet.solana.com';

const fetchWalletBalance = async () => {
  console.log('Fetching wallet balance...');
  try {
    const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
    const publicKey = new PublicKey(WALLET_ADDRESS);
    const balance = await connection.getBalance(publicKey);
    console.log('Wallet balance (lamports):', balance);
    return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

export const WalletBalance = () => {
  const { data: balance, isLoading, isError } = useQuery({
    queryKey: ['walletBalance'],
    queryFn: fetchWalletBalance,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3, // Retry failed requests 3 times
  });

  if (isLoading) {
    return (
      <Card className="p-4 animate-pulse">
        <h2 className="text-xl font-bold mb-2">Brodie's Wallet</h2>
        <p className="text-muted-foreground">Loading balance...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-2">Brodie's Wallet</h2>
        <p className="text-red-500">Error fetching balance</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-2">Brodie's Wallet</h2>
      <p className="text-2xl font-mono">{balance?.toFixed(4)} SOL</p>
      <p className="text-xs text-muted-foreground mt-2 break-all">{WALLET_ADDRESS}</p>
    </Card>
  );
};