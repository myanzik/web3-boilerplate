import React, { useCallback, type FC, type ChangeEvent } from "react";

import { Box, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { isAddress, zeroAddress } from "viem";
import { useEnsResolver } from "wagmi";

import { useDebounce, useNotify } from "@/hooks";

import Jazzicons from "./Jazzicons";
import warningImage from "../../../public/img/warning.svg";

interface AddressInputProps {
  address: string;
  setAddress: (address: string) => void;
}

const AddressInput: FC<AddressInputProps> = ({ address, setAddress }) => {
  const {
    data: resolvedAddress,
    isLoading: isResolvingInProgress,
    isError,
    error,
  } = useEnsResolver({
    name: address,
  });

  const debouncedReceiver = useDebounce(address, 2000);
  const { notifyError } = useNotify();

  const isValidEthAddress = (value: string) => value.startsWith("0x") && value.length === 42;

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      setAddress(value);

      // If we have a resolved address from the ENS and it's valid, update the state
      if (resolvedAddress && resolvedAddress !== zeroAddress) {
        setAddress(resolvedAddress);
      }
      // If the ENS resolver returns an error, notify the user
      else if (debouncedReceiver && isError) {
        notifyError({
          title: "Error:",
          message: error?.message ?? "Invalid address or ENS name.",
        });
      }
    },
    [resolvedAddress, debouncedReceiver, isError, error?.message, notifyError, setAddress],
  );

  const getAddonContent = (): JSX.Element | null => {
    if (isResolvingInProgress) return <Spinner />;
    const validAddress = isValidEthAddress(address)
      ? address
      : isAddress(resolvedAddress as string) && resolvedAddress !== zeroAddress
        ? resolvedAddress
        : undefined;

    if (validAddress) return <Jazzicons seed={validAddress.toLowerCase()} size={30} />;
    if (!resolvedAddress && address && !isResolvingInProgress)
      return (
        <Image
          alt="warning icon"
          src={warningImage.src}
          className="icon-wrapper error-icon"
          width={30}
          height={30}
        />
      );
    return null;
  };

  return (
    <Box w={"100%"}>
      <InputGroup>
        <InputLeftAddon w={"50px"} p={0} justifyContent={"center"}>
          {getAddonContent()}
        </InputLeftAddon>
        <Input
          value={address}
          onChange={handleInput}
          placeholder="Enter Ethereum name or address"
          name="ethereum"
          spellCheck={false}
        />
      </InputGroup>
    </Box>
  );
};

export default AddressInput;
