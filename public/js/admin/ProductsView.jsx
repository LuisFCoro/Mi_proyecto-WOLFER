function ProductsView() {
    const [productos, setProductos] = React.useState(window.productosFromServer || []);
    const [seleccionados, setSeleccionados] = React.useState([]);
    const [busqueda, setBusqueda] = React.useState('');
  
    const toggleSeleccion = (id) => {
      setSeleccionados((prev) =>
        prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
      );
    };
  
    const eliminarSeleccionados = async () => {
      for (const id of seleccionados) {
        await fetch(`/products/delete/${id}`, { method: 'POST' });
      }
  
      setProductos((prev) => prev.filter((p) => !seleccionados.includes(p.id)));
      setSeleccionados([]);
    };
  
    const productosFiltrados = productos.filter((p) => {
      const texto = busqueda.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(texto) ||
        p.marca.toLowerCase().includes(texto) ||
        p.precio.toString().includes(texto)
      );
    });
  
    return (
      <div className="products-container">
        <h2 className="products-title"><i className="fas fa-boxes-stacked"></i> Mis Productos</h2>
  
        <div className="products-actions">
          <div className="search-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Buscar por nombre, marca o precio..."
              className="search-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <a href="/products/create">
            <button className="btn create-btn">
              <i className="fas fa-plus"></i> Crear
            </button>
          </a>
  
          <button
            className="btn delete-btn"
            onClick={eliminarSeleccionados}
            disabled={seleccionados.length === 0}
          >
            <i className="fas fa-trash"></i> Eliminar
          </button>
        </div>
  
        <div className="products-list">
          {productosFiltrados.length === 0 ? (
            <p style={{ marginTop: '20px' }}>No se encontraron productos 🧐</p>
          ) : (
            productosFiltrados.map((p) => (
              <div className="product-card" key={p.id}>
                <input
                  type="checkbox"
                  className="product-checkbox"
                  checked={seleccionados.includes(p.id)}
                  onChange={() => toggleSeleccion(p.id)}
                />
                <img src={p.imagen} alt={p.nombre} className="product-image" />
                <div className="product-details">
                  <p className="product-name">
                    <i className="fas fa-tag"></i> {p.nombre}
                  </p>
                  <p className="product-price">
                    <i className="fas fa-dollar-sign"></i> {p.precio}
                  </p>
                  <p className="product-brand">
                    <i className="fas fa-industry"></i> {p.marca}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<ProductsView />);
  