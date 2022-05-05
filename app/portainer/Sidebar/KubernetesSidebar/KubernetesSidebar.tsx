import { SidebarItem } from '@/portainer/Sidebar/SidebarItem';
import { EnvironmentId } from '@/portainer/environments/types';

import { KubectlShellButton } from './KubectlShell';

interface Props {
  environmentId: EnvironmentId;
}

export function KubernetesSidebar({ environmentId }: Props) {
  return (
    <>
      <KubectlShellButton environmentId={environmentId} />

      <SidebarItem
        to="kubernetes.dashboard"
        params={{ endpointId: environmentId }}
        iconClass="fa-tachometer-alt fa-fw"
        label="Dashboard"
      />

      <SidebarItem
        to="kubernetes.templates.custom"
        params={{ endpointId: environmentId }}
        iconClass="fa-rocket fa-fw"
        label="Custom Templates"
      />

      <SidebarItem
        to="kubernetes.resourcePools"
        params={{ endpointId: environmentId }}
        iconClass="fa-layer-group fa-fw"
        label="Namespaces"
      />

      <SidebarItem
        to="kubernetes.templates.helm"
        params={{ endpointId: environmentId }}
        iconClass="fa-dharmachakra fa-fw"
        label="Helm"
        authorizations="HelmInstallChart"
      />

      <SidebarItem
        to="kubernetes.applications"
        params={{ endpointId: environmentId }}
        iconClass="fa-laptop-code fa-fw"
        label="Applications"
      />

      <SidebarItem
        to="kubernetes.configurations"
        params={{ endpointId: environmentId }}
        iconClass="fa-file-code fa-fw"
        label="ConfigMaps & Secrets"
      />

      <SidebarItem
        to="kubernetes.volumes"
        params={{ endpointId: environmentId }}
        iconClass="fa-database fa-fw"
        label="Volumes"
      />

      <SidebarItem
        iconClass="fa-server fa-fw"
        label="Cluster"
        to="kubernetes.cluster"
        params={{ endpointId: environmentId }}
      >
        <SidebarItem
          to="portainer.k8sendpoint.kubernetesConfig"
          params={{ id: environmentId }}
          label="Setup"
          authorizations="K8sClusterSetupRW"
          adminOnlyCE
        />

        <SidebarItem
          to="kubernetes.registries"
          params={{ endpointId: environmentId }}
          label="Registries"
        />
      </SidebarItem>
    </>
  );
}