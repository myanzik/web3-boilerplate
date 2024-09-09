import { useState } from "react";

import { type Address } from "viem";
import { useAccount, useReadContract } from 'wagmi'

import { abi } from '@/constants/abis/erc20'

export function useErc20Balance(erc20Address: Address) {
    const [balance, setBalance] = useState<bigint>(0n);
    const { address } = useAccount();

    const result = useReadContract({
        abi,
        address: erc20Address || '0x6b175474e89094c44da98b954eedeac495271d0f',
        functionName: 'balanceOf',
        args: [address as Address],
    });

    return { result };
}
