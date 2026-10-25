type ErrorPayload = Record<string, unknown>;

function isErrorPayload(value: unknown): value is ErrorPayload {
  return typeof value === 'object' && value !== null;
}

function messageFromPayload(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  if (!isErrorPayload(value)) {
    return null;
  }

  for (const key of ['message', 'detail', 'defaultMessage']) {
    const message = value[key];
    if (typeof message === 'string' && message.trim()) {
      return message.trim();
    }
  }

  const nestedError = value['error'];
  if (typeof nestedError === 'string' && nestedError.trim()) {
    return nestedError.trim();
  }
  if (isErrorPayload(nestedError)) {
    const nestedMessage = messageFromPayload(nestedError);
    if (nestedMessage) {
      return nestedMessage;
    }
  }

  const errors = value['errors'];
  if (Array.isArray(errors)) {
    const messages = errors
      .map((item) => messageFromPayload(item))
      .filter((message): message is string => message !== null);
    if (messages.length) {
      return messages.join(' ');
    }
  }
  if (isErrorPayload(errors)) {
    const messages = Object.values(errors)
      .flatMap((item) => (Array.isArray(item) ? item : [item]))
      .filter((item): item is string => typeof item === 'string' && !!item.trim());
    if (messages.length) {
      return messages.join(' ');
    }
  }

  return null;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isErrorPayload(error) && 'error' in error) {
    const responseMessage = messageFromPayload(error['error']);
    if (responseMessage) {
      return responseMessage;
    }
  }

  return messageFromPayload(error) ?? fallback;
}
