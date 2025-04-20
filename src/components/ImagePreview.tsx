import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const ImagePreview = ({ images }: { images: string[] }) => {
    return (
        <div>
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                {
                    images.map(img => (
                        <a key={img} href={img}>
                            <img alt={img} src={img} />
                        </a>
                    ))
                }
            </LightGallery>
        </div>
    );
};

export default ImagePreview;