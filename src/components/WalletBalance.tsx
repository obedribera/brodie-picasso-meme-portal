import { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Card } from './ui/card';
import { useQuery } from '@tanstack/react-query';

const WALLET_ADDRESS = '4e3kjUPi55QUakwrr5SRhuBsUb8tcp2jZSkS6szqFSk6';
const TOKEN_MINT_ADDRESS = '22UaSSL6c6TYLexhaxWisq2mDaRTzNDX1X222anPpump';
const SOLANA_RPC_URL = 'https://ssc-dao.genesysgo.net';

const fetchBalances = async () => {
  console.log('Fetching balances...');
  try {
    const connection = new Connection(SOLANA_RPC_URL, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: 60000,
    });
    
    const publicKey = new PublicKey(WALLET_ADDRESS);
    
    // Fetch SOL balance
    console.log('Fetching SOL balance...');
    const solBalance = await connection.getBalance(publicKey);
    console.log('SOL balance (lamports):', solBalance);

    // Fetch token accounts
    console.log('Fetching token accounts...');
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });

    console.log('Token accounts:', tokenAccounts);

    // Find $BRODIE token account
    const brodieAccount = tokenAccounts.value.find(
      account => account.account.data.parsed.info.mint === TOKEN_MINT_ADDRESS
    );

    console.log('Brodie account:', brodieAccount);

    const brodieBalance = brodieAccount 
      ? Number(brodieAccount.account.data.parsed.info.tokenAmount.amount) / 
        Math.pow(10, brodieAccount.account.data.parsed.info.tokenAmount.decimals)
      : 0;

    console.log('$BRODIE balance:', brodieBalance);

    return {
      solBalance: solBalance / LAMPORTS_PER_SOL,
      brodieBalance
    };
  } catch (error) {
    console.error('Error fetching balances:', error);
    throw error;
  }
};

export const WalletBalance = () => {
  const { data: balances, isLoading, isError } = useQuery({
    queryKey: ['walletBalances'],
    queryFn: fetchBalances,
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
      <div className="space-y-2">
        <p className="text-2xl font-mono">{balances?.solBalance?.toFixed(4)} SOL</p>
        <p className="text-2xl font-mono">{balances?.brodieBalance?.toLocaleString()} $BRODIE</p>
      </div>
      <p className="text-xs text-muted-foreground mt-2 break-all">{WALLET_ADDRESS}</p>
    </Card>
  );
};