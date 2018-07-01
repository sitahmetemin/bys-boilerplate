export default function restMiddleware({ dispatch, getState }) {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        const { promise, types, ...rest } = action;
        if (!promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({ ...rest, type: REQUEST });

        return promise.then(response => {
            const ok = (response.status >= 200 && response.status < 300);
            response.json().then((result) => {

                if (ok) {
                    if (typeof action.preSuccess === 'function') {
                        action.preSuccess(dispatch, result);
                    }
                    next({ ...rest, payload: result, type: SUCCESS, statusCode: response.status });
                    if (typeof action.success === 'function') {
                        action.success(dispatch, result);
                    }
                } else {
                    if (typeof result === "object") {
                        next({ ...rest, payload: result , error: true, type: FAILURE, statusCode: response.status });
                    } else {
                        next({ ...rest, payload: result , error: true, type: FAILURE, statusCode: response.status });
                    }
                    if (typeof action.error === "function") {
                        action.error(dispatch, result, {statusCode: response.status});
                    }

                    next({ ...rest, payload: result, error: true, type: FAILURE, statusCode: response.status });
                    if (typeof action.error === 'function') {
                        action.error(dispatch, result);
                    }
                }
            }).catch((error) => {
                const err = { code: 'SYS999999', error };
                next({ ...rest, payload: err, error: true, type: FAILURE, statusCode: 501 });
                if (typeof action.error === 'function') {
                    action.error(dispatch, err);
                }
            });
        });
    };
}
