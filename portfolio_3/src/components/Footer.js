function Footer({text}) {
    return(
        <footer className="text-center color-white bg-dark-grey p-md">
            {text} {new Date().getFullYear()}
        </footer>
    );
}

export default Footer;