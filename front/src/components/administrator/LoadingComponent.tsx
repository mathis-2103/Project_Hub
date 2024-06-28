import React, {useState, useEffect} from 'react';
import {Spinner} from '@chakra-ui/react';

function LoadingComponent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="black"
          size="xl"
        />
      </div>
    );
  } else {
    return <></>;
  }
}

export default LoadingComponent;
