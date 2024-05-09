import "./style.scss";

interface HeaderProps {
  openForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ openForm }) => {
  const handleClick = () => {
    openForm();
  };
  return (
    <div className="header-for-tasks">
      <div className="header-for-tasks-text">Your Tasks</div>
      <button className="add-new-task-button" onClick={handleClick}>
        Add new Task
      </button>
    </div>
  );
};

export default Header;
