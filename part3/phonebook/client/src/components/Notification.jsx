const Notification = ({ notification }) => {
    if (!notification) {
        return;
    }

    return (
        <div
            style={{
                color: notification.error ? "red" : "green",
                background: "lightgrey",
                fontSize: "20px",
                borderStyle: "solid",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
            }}>
            {notification.message}
        </div>
    )
}

export default Notification;