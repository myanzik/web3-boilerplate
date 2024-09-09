// components/MainPane.tsx
import { type FC, useState } from "react";

import { Box, Divider, Flex, Heading, useColorMode } from "@chakra-ui/react";

import { AddressInput } from "@/components";
import styles from "@/styles/mainPane.module.css";

import { SignMessage, BlockNumber, Erc20Balance } from "./components";

const ERC20: FC = () => {
    const { colorMode } = useColorMode();
    const [erc20Address, setErc20Address] = useState<string>('');

    return (
        <>
            <Box
                className={styles.container}
                border={colorMode === "light" ? "none" : "1px solid rgba(152, 161, 192, 0.24)"}
            >
                <Heading as="h2" fontSize={"2rem"} mb={10} className="text-shadow">
                    ERC20
                </Heading>

                <Flex className={styles.content}>
                    <AddressInput address={erc20Address} setAddress={setErc20Address} />

                    {erc20Address && (
                        <>

                            <Erc20Balance erc20Address={erc20Address} />
                            <BlockNumber />
                            <Divider mb={4} />
                            <div className={styles.centerContainer}>
                                <SignMessage />
                            </div>

                            {/* <Divider mb={4} />
                            <div className={styles.centerContainer}>
                                <Erc20Permit />
                            </div> */}

                        </>
                    )}
                </Flex>
            </Box>
        </>
    );
};

export default ERC20;
