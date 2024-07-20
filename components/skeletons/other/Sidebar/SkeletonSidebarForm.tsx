// 'use client';
import '@/components/UI/Form/SidebarForm.scss';
/*type SkeletonSidebarFormType = {
  // children: ReactNode;
}*/
import SkeletonText from '@/components/skeletons/Text/SkeletonText';
import SkeletonPicker from '@/components/skeletons/Picker/SkeletonPicker';
import SkeletonHeading from '@/components/skeletons/Heading/SkeletonHeading';
import SkeletonSidebarButton from '@/components/skeletons/Button/SkeletonSidebarButton';
import SkeletonCheckbox from '@/components/skeletons/Checkbox/SkeletonCheckbox';
import SkeletonExtraPrice from '@/components/skeletons/other/Sidebar/SkeletonExtraPrice';
import { Skeleton } from '@mui/material';
import SkeletonButton from '@/components/skeletons/Button/SkeletonButton';

export default function SkeletonSidebarForm(/*{  }: SkeletonSidebarFormType*/) {
  return (
    <form className={`description__tour-overview-sidebar__form`}>
      <div className="description__tour-overview-sidebar">
        <div style={{
          display: 'flex',
          gap: '.5rem',
          marginBottom: `2.4rem`
        }}>
          <SkeletonText widths={[50]} height={12} />
          <SkeletonText widths={[50]} height={12} />
        </div>
        <div className="description__tour-overview-sidebar-wrapper">
          <div>
            <SkeletonPicker borderBottom={`1px solid #e0e0e0`} />
            <SkeletonPicker />
          </div>
        </div>

        <div className="description__tour-overview-sidebar__tickets grid">
          <SkeletonHeading width={100} height={17} amount={1} marginTop={`2.4rem`} marginBottom={`1.6rem`} />
          <div style={{
            display: 'flex',
            flexDirection: `column`,
            gap: `1.4rem`
          }}>

            <div className="flex flex-space-between flex-align-center">
              <div>
                <SkeletonText marginBottom={`0`} widths={[120]} height={13} />
              </div>
              <SkeletonSidebarButton />
            </div>
            <div className="flex flex-space-between flex-align-center">
              <div>
                <SkeletonText marginBottom={`0`} widths={[110]} height={13} />
              </div>
              <SkeletonSidebarButton />
            </div>
            <div className="flex flex-space-between flex-align-center">
              <div>
                <SkeletonText marginBottom={`0`} widths={[120]} height={13} />
              </div>
              <SkeletonSidebarButton />
            </div>
          </div>
        </div>
        <div style={{ marginBottom: `2rem` }} className="description__tour-overview-sidebar__tickets grid">
          <h3
            className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">
            <div>
              <SkeletonHeading width={100} height={17} amount={1} />
            </div>
          </h3>
          <div style={{ marginBottom: `1rem` }}>
            <SkeletonCheckbox extraInfo />
          </div>

          <div>
            <SkeletonCheckbox extraInfo />
          </div>

        </div>
        <SkeletonExtraPrice />
        <div style={{ display: `flex`, justifyContent: `space-between`, marginBottom: `2.2rem` }}>
          <Skeleton variant="rounded" width={55} height={17} />
          <Skeleton variant="rounded" width={25} height={17} />
        </div>
        <SkeletonButton height={40} width={`90%`} borderRadius={`12px`} />
      </div>
    </form>
  );
}
