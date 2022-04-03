const Button = ({ selectedlist, uri }) => {
  return <button className='btn-select'>{selectedlist.includes(uri) ? "Deselect" : "Select"}</button>;
};

export default Button;