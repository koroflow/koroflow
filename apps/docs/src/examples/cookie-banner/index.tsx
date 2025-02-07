import { Preview } from '~/components/docs/preview';
import { defaultPage } from './example-page';

const CookieBannerExample = () => {
	return <Preview name="sandbox" code={defaultPage} />;
};

export default CookieBannerExample;
