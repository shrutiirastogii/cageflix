import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Dropdown,
} from "react-bootstrap";
import SearchBar from "./SearchBar";
import Logo from "../assets/logo.png";

interface HeaderProps {
  query: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ query, onSearchChange }) => {

  const menuItems = [
    { key: "home", label: "Home" },
    { key: "movies", label: "Movies" },
    { key: "new", label: "New & Popular" },
    { key: "mylist", label: "My List" },
  ];

  const [initials, setInitials] = useState<string>("");
  const [tab, setTab] = useState<any>(menuItems[0]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setInitials(data.user.initials || "?"))
      .catch(() => setInitials("?"));
  }, []);

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setTab(eventKey);
    }
  };

  return (
    <Navbar expand="lg" style={styles.header}>
      <Container fluid className="align-items-center">
        <Navbar.Brand style={styles.customWrapper} onClick={() => setTab("home")}>  
          {/* <img src={Logo} alt="Cageflix" style={styles.logo} /> */}
          <img
            src={Logo}
            alt="Cageflix"
            className="d-none d-md-block"
            style={{ height: 40, width: 'auto', maxWidth: '150px' }}
          />
          {/* Small logo */}
          <img
            src={Logo}
            alt="Cageflix"
            className="d-md-none"
            style={{ height: 30, width: 'auto', maxWidth: '120px' }}
          />
        </Navbar.Brand>
        <Nav
          activeKey={tab}
          onSelect={handleSelect}
          className="ms-3 d-none d-lg-flex"
          style={styles.nav}
        >
          {menuItems.map((item) => (
            <Nav.Link style={{...styles.text, fontWeight: tab === item.key ? "bold" : "normal" }} eventKey={item.key} key={item.key}>
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
        <Dropdown className="ms-3 d-lg-none">
          <Dropdown.Toggle variant="dark" id="browse-dropdown">
            {tab.label}
          </Dropdown.Toggle>
          <Dropdown.Menu style={styles.dropDownMenu} align="start">
            {menuItems.map((item) => (
              <Dropdown.Item
                key={item.key}
                active={tab === item.key}
                onClick={() => handleSelect(item.key)}
                style={styles.text}
              >
                {item.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form className="d-flex ms-auto me-2" style={styles.searchWrapper}>
          <SearchBar query={query} onChange={onSearchChange} />
        </Form>
        <div style={styles.avatar}>{initials}</div>
      </Container>
    </Navbar>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#141414",
    // padding: "16px 32px",
    boxSizing: "border-box",
    zIndex: 1000,
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
  },
  logo: {
    height: 40,
    width: 'auto',
    maxWidth: '150px',
  },
  nav: {
    flexDirection: 'row',
  },
  searchWrapper: {
    maxWidth: '300px',
    flex: '0 0 auto', 
    width: 'auto', 
  },
  avatar: {
    // width: "auto",
    // height: "auto",
    borderRadius: "5px",
    backgroundColor: "#E50914",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "auto",
    cursor: "pointer",
    padding:'5px',
    maxHeight:'40px',
    maxWidth:'40px'
  },
  text: {
    fontSize: "14px",
    color: "#fff",
    alignSelf:'center'
  },
  dropDown:{
    backgroundColor:'black'
  },
  dropDownMenu:{
    backgroundColor:'black'
  }
};

export default Header;
