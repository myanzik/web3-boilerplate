// components/MainPane.tsx
import { type FC } from "react";

import AccountInfo from "./AccountInfo";
import ERC20 from "./ERC20";

const MainPane: FC = () => {


  return (
    <>
      <AccountInfo />
      <ERC20 />
    </>
  );
};

export default MainPane;
