import CSS from "csstype";

const NotFound = () => {
    const h1Style: CSS.Properties = {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    };
    return (
        <div className="container">
            <h1 style={h1Style}>Ooops... Page not found!</h1>
        </div>
    );
};

export default NotFound;
