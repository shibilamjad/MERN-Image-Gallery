function ButtonAdd({ addImage, handleAdd, progress }) {
  return (
    <>
      <button>
        <label className="label">
          <input type="file" accept="image/*" onChange={handleAdd} />
          <span className=" text-[30px]">+</span>
        </label>
      </button>
      {addImage ? (
        <p className="text-[22px] text-gray-400">{addImage.name}</p>
      ) : (
        <p className="text-[22px] text-gray-400">Image upload</p>
      )}

      <div className=" flex items-center justify-center py-2">
        <div className="progressbar">
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "rgba(239, 217, 194, 1)",
              transition: "width 0.5s",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default ButtonAdd;
