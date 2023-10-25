/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AppContextProvider } from 'utils/context';
import useFetch from 'hooks/useFetch';
import ContentTree from 'components/ContentTree';
import ContentView from 'components/ContentView';

const URL = 'http://localhost:3004/data';

const baseStyles = css`
  font-family: Open Sans;
  display: flex;
  padding: 24px;
  align-items: flex-start;
  gap: 24px;
`;

const App = () => {
  const { isLoading, data } = useFetch(URL);

  return (
    <AppContextProvider>
      <main css={baseStyles}>
        {!isLoading && (
          <>
            <ContentTree content={data.content.document} />
            <ContentView content={data.content.document} />
          </>
        )}
      </main>
    </AppContextProvider>
  );
};

export default App;
