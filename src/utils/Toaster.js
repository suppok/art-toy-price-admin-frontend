import { toaster, Notification } from 'rsuite';

export const showSuccessNotification = (message) => {
  toaster.push(
    <Notification type="success" header="Success">
      {message}
    </Notification>,
    { placement: 'topEnd' }
  );
};

export const showErrorNotification = (message) => {
  toaster.push(
    <Notification type="error" header="Error">
      {message}
    </Notification>,
    { placement: 'topEnd' }
  );
};
