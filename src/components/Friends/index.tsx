import React, { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { scrollbarMixin } from '../../styles/common/mixins';
import { AllRoutes } from '../AppRoutes';
import { Tab } from '../Tab';

const StTabs = styled.div`
  display: flex;
`;

const StList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  gap: 15px;
  overflow-y: auto;
  ${scrollbarMixin()}
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const Friends = () => {
  const loc = useLocation();
  const [activeTab, setActiveTab] = useState(loc.pathname === AllRoutes.friends ? 1 : 2);

  const tabs = useMemo(() => {
    return [
      { tabContent: 'Friends', id: 1, to: AllRoutes.friends },
      { tabContent: 'Requests', id: 2, to: AllRoutes.friendsReqs },
    ];
  }, []);

  return (
    <StWrapper>
      <StTabs>
        {tabs.map((t) => (
          <Tab key={t.id} to={t.to} active={activeTab === t.id} onClick={() => setActiveTab(t.id)}>
            <NavLink to={t.to}>{t.tabContent}</NavLink>
          </Tab>
        ))}
      </StTabs>
      <StList>
        <Outlet />
      </StList>
    </StWrapper>
  );
};

export default Friends;
