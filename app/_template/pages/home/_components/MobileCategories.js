import MegaMenuNavigation from '../../../_components/MegaMenuNavigation';

const MobileCategories = () => {
  return (
    <div className="mobile-categories lg:hidden bg-white border border-b border-gray-400">
      <div className="container relative">
        <div className="py-2">
          <MegaMenuNavigation />
        </div>
      </div>
    </div>
  );
};

export default MobileCategories;
