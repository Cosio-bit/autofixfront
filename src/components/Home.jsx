
const Home = () => {
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '10px',
    },
    heading: {
      fontSize: '2.5rem',
      marginBottom: '20px',
      color: 'black', // Making heading text black
    },
    paragraph: {
      fontSize: '1.2rem',
      color: 'black', // Making paragraph text black
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Autofix: Sistema de Reparaciones de Vehículos</h1>
        <p style={styles.paragraph}>
          Bienvenido a Autofix, un sistema de reparaciones de vehículos. Puedes
          navegar por las diferentes secciones de la aplicación utilizando la barra
          de navegación en la parte superior de la página.
        </p>
      </div>
    </div>
  );
};

const backgroundImageUrl = "https://imgs.search.brave.com/2s2NZU7sv94_N-AIsDMpNQ_9VQLAIjYqll8aUf5tE_I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yZXRy/by1yZWQtY2FyLXN5/bnRod2F2ZS1wb3N0/ZXItdmFwb3J3YXZl/LXN1bnNldC1uZW9u/LWdyYWRpZW50LWJh/Y2tncm91bmQtcmV0/cm8tcmVkLWNhci1z/eW50aHdhdmUtcG9z/dGVyLXZhcG9yd2F2/ZS0yNjIwNDgzMDAu/anBn";

export default Home;
