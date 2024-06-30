import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl?: string;
}

const Header: FC<HeaderProps> = ({
  heading,
  paragraph,
  linkName,
  linkUrl = '#',
}) => {
  return (
    <div className="mb-10">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph}{' '}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;
