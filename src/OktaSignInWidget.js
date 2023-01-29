import React, { useEffect, useRef } from 'react';
import {OktaSignIn} from '@okta/okta-signin-widget';


const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current)
      return false;

    const widget = new OktaSignIn(config);

   widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return (<div ref={widgetRef} />);
};
export default OktaSignInWidget;
