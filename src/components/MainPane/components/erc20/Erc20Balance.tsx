import { type FC } from "react";

import type { Address } from "viem";

import { InfoText } from "@/components";
import { useErc20Balance } from "@/hooks/erc20/useErc20Balance";

const Balance: FC<{ erc20Address: string }> = ({ erc20Address }): JSX.Element => {

    const { result } = useErc20Balance(erc20Address as Address);
    const displayBalance = result?.data ? `Ξ ${result?.data}` : "0";

    return <InfoText label="Balance" value={displayBalance} />;
};

export default Balance;
