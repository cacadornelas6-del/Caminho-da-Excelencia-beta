  const handleUpdateClub = async (
    updates: Partial<Club> & { settings?: Partial<Club['settings']> }
  ) => {
    if (!currentUser || !club) return;
    const updated = await dbService.updateClub(currentUser.clubId, updates);
    setClub(updated);

    // Mantém o nome do clube sincronizado no usuário logado e na equipe
    setCurrentUser((prev) => (prev ? { ...prev, clubName: updated.name } : prev));
    const members = await dbService.getLeadershipMembers(currentUser.clubId);
    setLeadership(members);
  };
