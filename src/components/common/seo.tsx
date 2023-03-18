import { FC } from "react";
import { Helmet } from "react-helmet";
import CONFIG from "../config";

interface IProps {
    title?: string;
    description?: string;
}

const SEO: FC<IProps> = ({ title, description }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="noindex" />
        </Helmet>
    );
};

SEO.defaultProps = {
    title: CONFIG.APP_NAME ,
    description: CONFIG.APP_NAME,
};

export default SEO;
