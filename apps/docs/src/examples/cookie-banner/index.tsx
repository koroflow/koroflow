import { Preview } from '~/components/docs/preview';
import { defaultPage } from './examplePage';

const CookieBannerExample = () => {
	return <Preview name="sandbox" code={defaultPage} />;
};

export default CookieBannerExample;
