import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const NoTask = () => {
  const [anmTManagement, setTManagement] = useState<null | object>(null);

  useEffect(() => {
    import(`@/assets/task-management.json`).then((response) =>
      setTManagement(response.default),
    );
  }, []);

  return (
    <div className="flex max-w-sm mx-auto">
      {anmTManagement ? (
        <Lottie className="w-full" animationData={anmTManagement} loop={true} />
      ) : null}
    </div>
  );
};

export default NoTask;
