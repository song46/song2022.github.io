import config from "../../config/config";

const NFTItem = ({data, index, onClick}) => {
  const image = data.image.slice(7);

  return (
    <div className='nft-item' onClick={() => onClick(index)}>
      <img src={`${config.pinataBaseURI}${image}`} alt="nft content"/>
      <div className='info-container'>
        <span className='name'>{data.name}</span>
      </div>
    </div>
  );
};

export default NFTItem;