import React, { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AreaWrapper = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ // @see https://github.com/nativewind/nativewind/issues/628#issuecomment-2046987837
        backgroundColor: "#161622",
        height: "100%",
        paddingBottom: 0,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default AreaWrapper;