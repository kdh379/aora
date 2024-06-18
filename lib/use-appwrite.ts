import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = <TData>(fn: () => Promise<TData>) => {
  const [data, setData] = useState<TData>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("서비스 요청 중 오류가 발생했습니다.", "잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;