
const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
       
        <>
        <footer  style={{
            textAlign:"center",
            padding:"15",
            backgroundcolor:"#1e3a5f",
            color:"white",

        }}>
        <p>&copy; {currentYear} My Library. All rights reserved.</p>
        </footer>
        </>
    );
};
export default Footer;