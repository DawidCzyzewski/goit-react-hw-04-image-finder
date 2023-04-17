import { BallTriangle } from 'react-loader-spinner';

export const Spinner = () => {
  return (
    <div>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  );
};
