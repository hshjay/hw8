import React, { useEffect, useState, useSyncExternalStore } from "react";

interface SheetData {
  sheet1: Array<any[]>;
  sheet2: Array<any[]>;
}

interface Props {
  onReceived: (sheets: SheetData) => void;
}

function ReadSheet(props: Props) {
  const [data, setData] = useState<SheetData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sUrl =
      "https://script.google.com/macros/s/AKfycbw9mIsLRrOrk8RdAlevI3D_smw378Ht53oKYUx42R4GynKmmp-nkCLpwDBuSaLyUqu9/exec";

    fetch(sUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 응답 에러: ${res.status}`);
        }
        return res.json() as Promise<SheetData>;
      })
      .then((jsonData) => {
        setData(jsonData);
        if (jsonData) props.onReceived(jsonData);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  if (error) {
    return <div>에러발생: {error}</div>;
  }
  if (!data) {
    return <div>로딩 중...</div>;
  }
  return (
    <div>
      완료.
      {/* <h1>시트 데이터 가져오기</h1>
      <h2>Sheet1</h2>
      <pre>{JSON.stringify(data.sheet1, null, 2)}</pre>
      <h2>Sheet2</h2>
      <pre>{JSON.stringify(data.sheet2, null, 2)}</pre> */}
    </div>
  );
}

export default ReadSheet;
