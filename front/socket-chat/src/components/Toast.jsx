

const Toast = ( { user }) => {
    
  return (
    <div className="d-flex justify-content-center align-items-center">
      <span className="alert alert-success">{user} joined</span>
    </div>
  );
};

export default Toast;
